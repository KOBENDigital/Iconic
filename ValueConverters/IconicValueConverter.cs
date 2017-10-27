using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
            var obj = JObject.Parse(source.ToString());
            if (obj.Count == 0) return string.Empty; 
            return new HtmlString(obj["iconDisplay"].ToString());
        }
    }
}
