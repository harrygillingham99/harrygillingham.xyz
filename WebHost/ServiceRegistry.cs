using Scrutor;
using System.CodeDom.Compiler;

namespace Net6SpaTemplate
{
    public static class ServiceRegistry
    {
        public static void ScanForAllRemainingRegistrations(IServiceCollection services)
        {
            services.Scan(scan => scan
                .FromAssembliesOf(typeof(Program))
                .AddClasses(x => x.WithoutAttribute<GeneratedCodeAttribute>())
                .UsingRegistrationStrategy(RegistrationStrategy.Skip)
                .AsImplementedInterfaces()
                .WithScopedLifetime());
        }

        public static void AddConfig(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<AppSettings>(provider => configuration.GetSection("AppConfig").Bind(provider));
        }

        public static void AddForwardedHeaderOptions(IServiceCollection services)
        {
         
        }

        public static void AddRestClients(IServiceCollection services, IConfiguration configuration)
        {
            
        }

    }
}

