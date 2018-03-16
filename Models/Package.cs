using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Iconic.Models
{
    internal class Package
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Selector { get; set; }
        public string Template { get; set; }
        public string cssFile { get; set; }
        public string sourceFile { get; set; }
        public IEnumerable<string> ExtractedStyles { get; set; }
    }
}
