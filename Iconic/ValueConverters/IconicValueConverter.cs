using System;
using System.Web;
using Iconic.Configuration;
using Iconic.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Koben.Iconic.ValueConverters
{
    public class IconicValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(PublishedPropertyType propertyType)
             => propertyType.EditorAlias.Equals("koben.iconic");

        public override Type GetPropertyValueType(PublishedPropertyType propertyType)
            => typeof(HtmlString);

        public override PropertyCacheLevel GetPropertyCacheLevel(PublishedPropertyType propertyType)
            => PropertyCacheLevel.Elements;


        public override object ConvertSourceToIntermediate(IPublishedElement owner, PublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null) return string.Empty;
            SelectedIcon icon = null;
            if (source is JObject)
            {
                icon = ((JObject)source).ToObject<SelectedIcon>();
            }
            else
            {
                icon = JsonConvert.DeserializeObject<SelectedIcon>(source.ToString());
            }
            if (icon == null)
            {
                return string.Empty;
            }

            return icon;
        }

        public override object ConvertIntermediateToObject(IPublishedElement owner, PublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview)
        {
            var icon = (SelectedIcon)inter;

            var packages = new ConfiguredPackagesCollection(propertyType);

            var pckg = packages[icon.PackageId];

            if (icon == null || pckg == null)
            {
                return string.Empty;
            }

            var display = pckg.FrontendTemplate.Replace("{icon}", icon.Icon);

            return new HtmlString(display);
        }
    }
}
