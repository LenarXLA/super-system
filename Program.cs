using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

//JSON Serializer
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options => 
    options.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options => 
    options.SerializerSettings.ContractResolver = new DefaultContractResolver());

var app = builder.Build();

app.UseStaticFiles();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
