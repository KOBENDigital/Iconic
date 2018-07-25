using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Iconic.Helpers
{
    public static class HtmlExtensions
    {
        /// <summary>
        /// It helps to add html attributes and extra class to an Iconic icon template.
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="icon"></param>
        /// <param name="htmlAttributes">Replaces an {attributes} placeholder in the icon template with the atttributes.</param>
        /// <param name="extraClasses">Replaces an {classes} placeholder in the icon template.</param>
        /// <returns></returns>
        public static IHtmlString RenderIcon(this HtmlHelper helper, IHtmlString icon, object htmlAttributes, params string[] extraClasses)
        {            

            var htmlAttributesDict = HtmlHelper.AnonymousObjectToHtmlAttributes(htmlAttributes);
            StringBuilder attributesString = new StringBuilder();

            foreach (var item in htmlAttributesDict)
            {
                attributesString.Append($"{ConvertToJs(item.Key)}=\"{item.Value}\"");

            }

            var modifiedTemplate = icon.ToString().Replace("{attributes}", attributesString.ToString())
                                                  .Replace("{classes}", String.Join(" ", extraClasses));
            

            return new HtmlString(modifiedTemplate);
        }

        private static string ConvertToJs(string s)
        {
            string pattern = "([A-Z])";
            return Regex.Replace(s, pattern, "-$1").ToLower();
        }
        
    }
}
