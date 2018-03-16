using Iconic.Configuration;
using Iconic.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
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

            var icon = JsonConvert.DeserializeObject<SelectedIcon>((string)source);
            var packages = new ConfiguredPackagesCollection(propertyType);

            var pckg = packages[icon.PackageId];

            if (icon == null || pckg == null) return string.Empty;

            var display = pckg.Template.Replace("{icon}", icon.Icon);

            return new HtmlString(display);
        }
    }
}
