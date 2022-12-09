namespace harrygillingham.xyz.Objects.Attributes;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Enum | AttributeTargets.Struct, AllowMultiple = true,
    Inherited = false)]
public sealed class NSwagIncludeAttribute : Attribute
{
}