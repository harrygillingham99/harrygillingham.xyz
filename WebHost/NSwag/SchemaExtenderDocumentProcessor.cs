using NSwag.Generation.Processors.Contexts;
using NSwag.Generation.Processors;
using System.Reflection;
using harrygillingham.xyz.BLL.Facades;
using harrygillingham.xyz.Objects.Attributes;
using harrygillingham.xyz.Objects.Config;

namespace harrygillingham.xyz.WebHost.NSwag
{
    /*
  * NSwag Schema Post-Processor to add any classes with the [NSwagInclude] attribute
  * to the schema
  */
    [ScrutorIgnore]
    public class SchemaExtenderDocumentProcessor : IDocumentProcessor
    {
        private readonly Type[] _typesToLoadAssembliesOf = { typeof(BlogConfig), typeof(BlogFacade) };

        public void Process(DocumentProcessorContext context)
        {
            //Get namespace
            var ns = GetType().Namespace;

            //Only load specific assemblies
            var assemblies = _typesToLoadAssembliesOf.Select(x => x.GetTypeInfo().Assembly);

            //Merge the lists of assemblies and check for any types with the [NSwagInclude] attribute
            var types = assemblies.SelectMany(x => x.ExportedTypes).Where(type =>
                !string.IsNullOrWhiteSpace(type.FullName) &&
                (ns == null || type.FullName.StartsWith(ns.Replace(".WebHost.NSwag", string.Empty))) &&
                type.GetTypeInfo().CustomAttributes.Any(x => x.AttributeType == typeof(NSwagIncludeAttribute)));

            //Add the types to the schema
            foreach (var type in types)
                if (!context.SchemaResolver.HasSchema(type, type.IsEnum))
                    context.SchemaGenerator.Generate(type, context.SchemaResolver);
        }
    }
}
