using System.Diagnostics;
using System.Net;
using System.Text.Json.Serialization;
using Auth0.AspNetCore.Authentication;
using harrygillingham.xyz.Objects.Exceptions;
using harrygillingham.xyz.WebHost.NSwag;
using Hellang.Middleware.ProblemDetails;
using Serilog;
using Serilog.Core;
using Serilog.Events;
using Serilog.Formatting.Json;
using static harrygillingham.xyz.WebHost.ServiceRegistry;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.ControlledBy(new LoggingLevelSwitch(LogEventLevel.Error))
    .Enrich.FromLogContext()
     .Enrich.WithAssemblyName()
    .Enrich.WithAssemblyVersion()
    .Enrich.WithClientAgent()
    .Enrich.WithClientIp()
    .Enrich.WithDemystifiedStackTraces()
    .Enrich.WithEnvironmentName()
    .Enrich.WithMachineName()
    .WriteTo.Console()
    .WriteTo.File(
        new JsonFormatter(renderMessage: true),
        Path.Combine(AppContext.BaseDirectory, "logs//Serilog.json"),
        shared: true,
        fileSizeLimitBytes: 20_971_520,
        rollOnFileSizeLimit: true,
        retainedFileCountLimit: 10)
    .CreateLogger();

Log.Information("App Start");

try
{
    var app = ConfigureBuilder(args, out var isDevelopment).Build();

    ConfigureApp(app, isDevelopment);

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception thrown in Program.cs");
}
finally
{
    Log.Information("App Shutting Down");
    Log.CloseAndFlush();
}

WebApplicationBuilder ConfigureBuilder(string[] args, out bool isDevelopment)
{
    var webApplicationBuilder = WebApplication.CreateBuilder(args);

    var isDevelopmentEnv = webApplicationBuilder.Environment.IsDevelopment() ||
                    webApplicationBuilder.Environment.IsStaging() ||
                    Debugger.IsAttached;

    isDevelopment = isDevelopmentEnv;

    webApplicationBuilder.Host.UseSerilog();

    var mvc = webApplicationBuilder.Services
        .AddControllersWithViews().AddJsonOptions(opt =>
        {
            opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });

    if (isDevelopmentEnv)
    {
        mvc.AddRazorRuntimeCompilation();
        webApplicationBuilder.Services.AddEndpointsApiExplorer();
        webApplicationBuilder.Services.AddOpenApiDocument(cfg =>
        {
            cfg.Title = "Internal API";
            cfg.Description = "An Internal API for the Front End";
            cfg.Version = "1.0";
            cfg.DocumentProcessors.Add(new SchemaExtenderDocumentProcessor());
        });
    }

    webApplicationBuilder.Services.ConfigureSameSiteNoneCookies();

    webApplicationBuilder.Services.AddAuth0WebAppAuthentication(options => {
        options.Domain = webApplicationBuilder.Configuration["Auth0:Domain"];
        options.ClientId = webApplicationBuilder.Configuration["Auth0:ClientId"];
        options.ClientSecret = webApplicationBuilder.Configuration["Auth0:ClientSecret"];
    });

    webApplicationBuilder.Services.AddProblemDetails(cfg =>
    {
        cfg.IncludeExceptionDetails = (_, _) => isDevelopmentEnv;

        cfg.MapToStatusCode<NotFoundException>((int)HttpStatusCode.NotFound);
        cfg.MapToStatusCode<BadRequestException>((int)HttpStatusCode.BadRequest);

    });

    webApplicationBuilder.Services.AddResponseCompression();

    webApplicationBuilder.Services.AddLazyCache();

    webApplicationBuilder.Services.AddHttpContextAccessor();

    AddConfig(webApplicationBuilder.Services, webApplicationBuilder.Configuration);

    AddRestClients(webApplicationBuilder.Services, webApplicationBuilder.Configuration);

    ScanForAllRemainingRegistrations(webApplicationBuilder.Services);

    return webApplicationBuilder;
}

void ConfigureApp(WebApplication webApplication, bool isDevelopment)
{
    webApplication.UseSerilogRequestLogging();

    webApplication.UseHttpsRedirection();

    webApplication.UseHsts();

    webApplication.UseStaticFiles();

    webApplication.UseRouting();

    webApplication.UseAuthentication();

    webApplication.UseAuthorization();

    webApplication.UseResponseCompression();

    if (isDevelopment)
    {
        webApplication.Use(async (context, next) =>
        {
            context.Response.Headers.Add("Cache-Control", "private, no-cache");
            await next.Invoke();
        });
        webApplication.UseSwaggerUi3();
        webApplication.UseOpenApi();
    }

    webApplication.UseProblemDetails();

    webApplication.UseEndpoints(endpoints =>
    {
        endpoints.MapDefaultControllerRoute();
        endpoints.MapControllers();
        endpoints.MapFallbackToController("Index", "Home");
    });
}

