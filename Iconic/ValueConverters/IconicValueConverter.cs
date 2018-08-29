using Iconic.Configuration;
using Iconic.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Logging;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Koben.Iconic.ValueConverters
{
    [PropertyValueType(typeof(HtmlString))]
    [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.Content)]
    public class IconicValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals("koben.iconic");
        }

        public override object ConvertSourceToObject(PublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null) return string.Empty;
            SelectedIcon icon = null;
            if (source is JObject)
            {
                icon = ((JObject)source).ToObject<SelectedIcon>();
            }
            else
            {
                try
                {
                    icon = JsonConvert.DeserializeObject<SelectedIcon>(source.ToString());
                }
                catch
                {
                    // Unexpected source object type
                    LogHelper.Warn<IconicValueConverter>($"Could not convert {nameof(source)} from {source.GetType()} to SelectedIcon");
                }
            }
            if (icon == null)
            {
                return string.Empty;
            }

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
