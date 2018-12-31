using System;
using System.Collections.Generic;
using System.Linq;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace ContactList.Models
{
    public class PersonDB
    {
        //connection string
        string  cs = ConfigurationManager.ConnectionStrings["ContactsEntities"].ConnectionString;

        //get Person list from db
        public List<Person> ListALL()
        {
            List<Person> personList = new List<Person>();
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("uspPersonSearch", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();

                while (rdr.Read())
                {
                    personList.Add(new Person
                    {
                        person_id = Convert.ToInt32(rdr["person_id"]),
                        first_name = rdr["first_name"].ToString(),
                        last_name = rdr["last_name"].ToString(),
                        state_id = Convert.ToInt32(rdr["state_id"]),
                        gender = Convert.ToChar(rdr["gender"]),
                        dob =  Convert.ToDateTime(rdr["dob"]),
                    });
                }            

                return personList;
            }
        }
        //Search List

        public List<Person> SearchList(String SearchVal)
        {
            List<Person> personList = new List<Person>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("uspPersonSearch", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@SearchValue", SearchVal);
                SqlDataReader rdr = com.ExecuteReader();

                while (rdr.Read())
                {
                    personList.Add(new Person
                    {
                        person_id = Convert.ToInt32(rdr["person_id"]),
                        first_name = rdr["first_name"].ToString(),
                        last_name = rdr["last_name"].ToString(),
                        state_id = Convert.ToInt32(rdr["state_id"]),
                        gender = Convert.ToChar(rdr["gender"]),
                        dob = Convert.ToDateTime(rdr["dob"]),
                    });
                }

                return personList;
            }
        }
        //Add Person
        public int Add(Person p)
        {
            int num;
            const String UniversalDateTime = "yyyy-MM-ddT00:00:00";
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cs = new SqlCommand("uspPersonUpsert", con);
                cs.CommandType = CommandType.StoredProcedure;
                cs.Parameters.AddWithValue("@id", p.person_id);
                cs.Parameters.AddWithValue( "@first_name", p.first_name);
                cs.Parameters.AddWithValue("@last_name", p.last_name);
                cs.Parameters.AddWithValue("@state_id", p.state_id);
                cs.Parameters.AddWithValue("@gender", p.gender);
                String thisDate = p.dob.ToString(UniversalDateTime);
                cs.Parameters.AddWithValue("@dob", thisDate);
                num = cs.ExecuteNonQuery();
            }
            return num;
        }

        //Update Person
        public int Update(Person p)
        {
            int num;
            const String UniversalDateTime = "yyyy-MM-ddT00:00:00";
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cs = new SqlCommand("uspPersonUpsert", con);
                cs.CommandType = CommandType.StoredProcedure;
                cs.Parameters.AddWithValue("@id", p.person_id);
                cs.Parameters.AddWithValue("@first_name", p.first_name);
                cs.Parameters.AddWithValue("@last_name", p.last_name);
                cs.Parameters.AddWithValue("@state_id", p.state_id);                
                cs.Parameters.AddWithValue("@gender", p.gender);                
                String thisDate = p.dob.ToString(UniversalDateTime);
                cs.Parameters.AddWithValue("@dob", thisDate);                
                num = cs.ExecuteNonQuery();
            }
            return num;
        }
    }
}