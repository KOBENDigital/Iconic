using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Iconic.Models;
using Newtonsoft.Json;
using Umbraco.Core;
using Umbraco.Core.Models.PublishedContent;

namespace Iconic.Configuration
{
    internal class ConfiguredPackagesCollection : IEnumerable<Package>
    {
        protected IEnumerable<Package> _packages;
        public PublishedPropertyType PropertyType { get; private set; }


        public IEnumerable<Package> Packages
        {
            get
            {
                return _packages;
            }
        }

        public ConfiguredPackagesCollection(PublishedPropertyType propertyType)
        {
            PropertyType = propertyType;
            _packages = GetConfiguratedPackages();
        }

        public IEnumerable<Package> GetConfiguratedPackages()
        {
            var _requestCache = ApplicationContext.Current.ApplicationCache.RequestCache;
            var packages = (IEnumerable<Package>)_requestCache.GetCacheItem(PropertyType.PropertyTypeAlias, () =>
                 {
                     var pvCollection = ApplicationContext.Current.Services.DataTypeService.GetPreValuesCollectionByDataTypeId(PropertyType.DataTypeId);

                     if (pvCollection.PreValuesAsDictionary["packages"] != null && !string.IsNullOrEmpty(pvCollection.PreValuesAsDictionary["packages"].Value))
                     {
                         return JsonConvert.DeserializeObject<IEnumerable<Package>>(pvCollection.PreValuesAsDictionary["packages"].Value);
                     }
                     else
                     {
                         return Enumerable.Empty<Package>();
                     }
                 });

            return packages;
        }



        public Package this[Guid id]
        {
            get
            {
                return _packages.FirstOrDefault(p => p.Id == id);
            }
        }

        public IEnumerator<Package> GetEnumerator()
        {
            foreach (var item in _packages)
            {
                yield return item;
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }


}
