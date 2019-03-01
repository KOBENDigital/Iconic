using System;
using System.Collections.Generic;
using System.Linq;
using Iconic.Models;
using Newtonsoft.Json.Linq;
using Umbraco.Core.Composing;
using Umbraco.Core.Models.PublishedContent;

namespace Iconic.Configuration
{
    internal class ConfiguredPackagesCollection : List<Package>
    {

        public ConfiguredPackagesCollection(PublishedPropertyType propertyType)
        {
            this.AddRange(GetConfiguratedPackages(propertyType));
        }

        private IEnumerable<Package> GetConfiguratedPackages(PublishedPropertyType propertyType)
        {
            var _requestCache = Current.AppCaches.RequestCache;
            var packages = (IEnumerable<Package>)_requestCache.Get(propertyType.Alias, () =>
                 {
                     var dataType = Current.Services.DataTypeService.GetDataType(propertyType.DataType.Id);
                     var configurationJson = (Dictionary<string, object>)dataType.Configuration;

                     var editorConfig = ((JArray)configurationJson["packages"]).ToObject<IEnumerable<Package>>();

                     return editorConfig;                  
                 });

            return packages;
        }



        public Package this[Guid id]
        {
            get
            {
                return this.FirstOrDefault(p => p.Id == id);
            }
        }

    }


}
