using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ContactList.Models;

namespace ContactList.Controllers
{
    public class HomeController : Controller
    {

        PersonDB prsnDB = new PersonDB();
        StatesDB stDB = new StatesDB();
        
        
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        //
        public JsonResult List()
        {
            return Json(prsnDB.ListALL(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(String SearchVal)
        {
            return Json(prsnDB.SearchList(SearchVal), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Person prsn)
        {
            return Json(prsnDB.Add(prsn), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Person prsn)
        {
            return Json(prsnDB.Update(prsn), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPersonByID(int ID)
        {
            var Person = prsnDB.ListALL().Find(x => x.person_id.Equals(ID));
            return Json(Person, JsonRequestBehavior.AllowGet);
        }
        public JsonResult StatesList()
        {
            return Json(stDB.ListALL(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStateByID(int ID)
        {                    
            var State = stDB.ListALL().Find(x => x.state_id.Equals(ID));
            return Json(State, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStateByCode(string Code)
        {  
            var State = stDB.ListALL().Find(x =>  x.state_code.Equals(Code));
            return Json(State, JsonRequestBehavior.AllowGet);
        }

        public List<States> GetStateList()
        {
            return stDB.ListALL().ToList();
        }
    }
}