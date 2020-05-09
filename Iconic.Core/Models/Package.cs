using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Iconic.Models
{
    public class Package
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Selector { get; set; }

        [JsonProperty(PropertyName = "template")]
        public string FrontendTemplate { get; set; }
        public string BackofficeTemplate { get; set; }
        public string CssFile { get; set; }
        public string SourceFile { get; set; }
        public IEnumerable<string> ExtractedStyles { get; set; }
    }
}
