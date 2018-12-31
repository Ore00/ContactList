using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace ContactList.Models
{
    public class StatesDB
    {
        //connection string
        string conStr = ConfigurationManager.ConnectionStrings["ContactsEntities"].ConnectionString;

        //get Person list from db
        public List<States> ListALL()
        {
            List<States> stateList = new List<States>();
            using (SqlConnection con = new SqlConnection(conStr))
            {
                con.Open();
                SqlCommand com = new SqlCommand("uspStatesList", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();

                while (rdr.Read())
                {
                    
                        stateList.Add(new States
                        {
                            state_id = Convert.ToInt32(rdr["state_id"]),
                            state_code = rdr["state_code"].ToString(),
                        });
                    
                }

                return stateList;
            }
        }
    }

}