namespace harrygillingham.xyz.Objects.Config
{
    public class AzureConfig
    {
        public string BlogTableName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public bool AddBlogEnabled { get; set; }
    }
}
