using Microsoft.EntityFrameworkCore;
using Persistence;
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var servies = scope.ServiceProvider;
try
{
    var context = servies.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{

    var logger = servies.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An Error occurred while running mirations");
}

app.Run();
