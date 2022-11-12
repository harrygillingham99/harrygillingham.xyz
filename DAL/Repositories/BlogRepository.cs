using Azure.Data.Tables;
using harrygillingham.xyz.DAL.Repositories.Base;
using harrygillingham.xyz.DAL.Repositories.Interfaces;
using harrygillingham.xyz.Objects.Config;
using Microsoft.Extensions.Options;

namespace harrygillingham.xyz.DAL.Repositories;
public class BlogRepository : BaseAzureStorageRepo , IBlogRepository
{
    public BlogRepository(IOptions<AzureConfig> azureOptions, TableClientOptions? options = null) : base(azureOptions.Value.ConnectionString, azureOptions.Value.BlogTableName, options)
    {
    }
}