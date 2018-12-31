using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactList.Models
{
    public class Person
    {
        public int person_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public int state_id { get; set;}
        public char  gender { get; set; }
        public DateTime dob { get; set; }
    }
}