using System.CodeDom.Compiler;
using harrygillingham.xyz.BLL.Facades;
using harrygillingham.xyz.DAL.Repositories.Base;
using harrygillingham.xyz.Objects.Attributes;
using harrygillingham.xyz.Objects.Config;
using Scrutor;

namespace harrygillingham.xyz.WebHost
{
    public static class ServiceRegistry
    {
        public static void ScanForAllRemainingRegistrations(IServiceCollection services)
        {
            services.Scan(scan => scan
                .FromAssembliesOf(typeof(Program), typeof(BlogFacade), typeof(BaseAzureStorageRepo))
                .AddClasses(x => x.WithoutAttribute<GeneratedCodeAttribute>().WithoutAttribute<ScrutorIgnoreAttribute>())
                .UsingRegistrationStrategy(RegistrationStrategy.Skip)
                .AsImplementedInterfaces()
                .WithScopedLifetime());
        }

        public static void AddConfig(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<AzureConfig>(provider => configuration.GetSection("AzureConfig").Bind(provider));
            services.Configure<BlogConfig>(provider => configuration.GetSection("BlogConfig").Bind(provider));
        }

        public static void AddRestClients(IServiceCollection services, IConfiguration configuration)
        {
            
        }
        public static IServiceCollection ConfigureSameSiteNoneCookies(this IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
                options.OnAppendCookie = cookieContext => CheckSameSite(cookieContext.CookieOptions);
                options.OnDeleteCookie = cookieContext => CheckSameSite(cookieContext.CookieOptions);
            });

            return services;
        }

        private static void CheckSameSite(CookieOptions options)
        {
            if (options.SameSite == SameSiteMode.None && options.Secure == false)
            {
                options.SameSite = SameSiteMode.Unspecified;
            }
        }

    }
}

