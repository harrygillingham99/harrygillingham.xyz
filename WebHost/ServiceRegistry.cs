using System.CodeDom.Compiler;
using harrygillingham.xyz.BLL.Facades;
using harrygillingham.xyz.DAL.Repositories.Base;
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
                .AddClasses(x => x.WithoutAttribute<GeneratedCodeAttribute>())
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

    }
}

