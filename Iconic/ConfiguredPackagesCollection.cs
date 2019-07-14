using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Iconic.Models;
using Newtonsoft.Json.Linq;
using Umbraco.Core.Composing;
using Umbraco.Core.Models.PublishedContent;

namespace Iconic
{
    public class ConfiguredPackagesCollection
    {
        private readonly IDictionary<string, IDictionary<Guid, Package>> _packagesCache;

        public ConfiguredPackagesCollection()
        {
            _packagesCache = new ConcurrentDictionary<string, IDictionary<Guid, Package>>();
        }

        public IDictionary<Guid, Package> GetConfiguratedPackages(IPublishedPropertyType propertyType)
        {

            if (!_packagesCache.ContainsKey(propertyType.Alias))
            {

                var dataType = Current.Services.DataTypeService.GetDataType(propertyType.DataType.Id);
                var configurationJson = (Dictionary<string, object>)dataType.Configuration;

                var editorConfig = ((JArray)configurationJson["packages"]).ToObject<IEnumerable<Package>>();

                _packagesCache.Add(propertyType.Alias, editorConfig.ToDictionary(p => p.Id));
            }

            return _packagesCache[propertyType.Alias];

        }

    }
}
