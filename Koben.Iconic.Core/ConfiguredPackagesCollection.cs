using Newtonsoft.Json.Linq;
using Koben.Iconic.Core.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
#if NET5_0_OR_GREATER
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
#else
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.Services;
#endif
namespace Koben.Iconic.Core
{
    public class ConfiguredPackagesCollection
    {
        private readonly IDictionary<string, IDictionary<Guid, Package>> _packagesCache;
        private readonly IDataTypeService dataTypeService;

        public ConfiguredPackagesCollection(IDataTypeService dataTypeService)
        {
            _packagesCache = new ConcurrentDictionary<string, IDictionary<Guid, Package>>();
            this.dataTypeService = dataTypeService;
        }

        public IDictionary<Guid, Package> GetConfiguratedPackages(IPublishedPropertyType propertyType)
        {
            var uniqueKey = propertyType.ContentType.Alias + "_" + propertyType.Alias;
            if (!_packagesCache.ContainsKey(uniqueKey))
            {

                var dataType = dataTypeService.GetDataType(propertyType.DataType.Id);
                var configurationJson = (Dictionary<string, object>)dataType.Configuration;

                var editorConfig = ((JArray)configurationJson["packages"]).ToObject<IEnumerable<Package>>();

                _packagesCache.Add(uniqueKey, editorConfig.ToDictionary(p => p.Id));
            }

            return _packagesCache[uniqueKey];

        }

    }
}
