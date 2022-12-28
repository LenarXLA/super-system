using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : Controller
    {
        private readonly IConfiguration _configuration;

        public GameController(IConfiguration configuration) => _configuration = configuration;

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select GameId, GameTitle from dbo.Games";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GeneralCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Game game)
        {
            string query = @"
                    insert into dbo.Games values
                    ('" + game.GameTitle + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GeneralCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added successfully");
        }

        [HttpPut]
        public JsonResult Put(Game game)
        {
            string query = @"
                    update dbo.Games set GameTitle =
                    '" + game.GameTitle + @"'
                    where GameId = '" + game.GameId + @"'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GeneralCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Update successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Games
                    where GameId = '" + id + @"'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GeneralCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted successfully");
        }
    }
}
