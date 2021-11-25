using Iconic.Models;
using Microsoft.AspNetCore.Html;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;

namespace Our.Iconic.ValueConverters
{
    public class IconicValueConverter : IPropertyValueConverter
    {
        private readonly ConfiguredPackagesCollection _configuredPackages;

        public IconicValueConverter(IDataTypeService dataTypeService)
        {
            _configuredPackages = new ConfiguredPackagesCollection(dataTypeService);
        }

        public bool IsConverter(IPublishedPropertyType propertyType)
             => propertyType.EditorAlias.Equals("koben.iconic");

        public Type GetPropertyValueType(IPublishedPropertyType propertyType)
            => typeof(HtmlString);

        public PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType)
            => PropertyCacheLevel.Elements;


        public object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null) return null;

            SelectedIcon icon = null;
            if (source is JObject jObject)
            {
                icon = jObject.ToObject<SelectedIcon>();
            }
            else
            {
                icon = JsonConvert.DeserializeObject<SelectedIcon>(source.ToString());
            }

            return icon;
        }

        public object ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview)
        {
            if (inter == null) return new HtmlString(string.Empty);

            var icon = (SelectedIcon)inter;

            var packages = _configuredPackages.GetConfiguratedPackages(propertyType);

            var pckg = packages[icon.PackageId];

            if (pckg == null) return string.Empty;

            var display = pckg.FrontendTemplate.Replace("{icon}", icon.Icon);

            return new HtmlString(display);
        }



        public bool? IsValue(object value, PropertyValueLevel level)
        {
            if (value is null) return null;

            if (value is SelectedIcon && level == PropertyValueLevel.Inter) return true;
            if (value is HtmlString && level == PropertyValueLevel.Object) return true;
            if (value is JObject && level == PropertyValueLevel.Source) return true;


            return false;
        }


        public object ConvertIntermediateToXPath(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview)
        {
            throw new NotImplementedException();
        }
    }
}
