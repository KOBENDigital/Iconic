using System;
using System.Web;
using Iconic;
using Iconic.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Koben.Iconic.ValueConverters
{
    public class IconicValueConverter : PropertyValueConverterBase
    {
        private readonly ConfiguredPackagesCollection _configuredPackages;

        public IconicValueConverter()
        {
            _configuredPackages = new ConfiguredPackagesCollection();
        }

        public override bool IsConverter(IPublishedPropertyType propertyType)
             => propertyType.EditorAlias.Equals("koben.iconic");

        public override Type GetPropertyValueType(IPublishedPropertyType propertyType)
            => typeof(HtmlString);

        public override PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType)
            => PropertyCacheLevel.Elements;


        public override object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview)
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

        public override object ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview)
        {
            if (inter == null) return new HtmlString(string.Empty);

            var icon = (SelectedIcon)inter;

            var packages = _configuredPackages.GetConfiguratedPackages(propertyType);

            var pckg = packages[icon.PackageId];

            if (pckg == null) return string.Empty;

            var display = pckg.FrontendTemplate.Replace("{icon}", icon.Icon);

            return new HtmlString(display);
        }
    }
}
