using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoWebApi.Models;

namespace TodoWebApi.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class TodosController : ControllerBase
{
    //public static List<Todo> Todos = new()
    //{
    //    new Todo { Id = 1, Work = "Get to work", IsComplated = false },
    //    new Todo { Id = 2, Work = "Pick up groceries", IsComplated = false },
    //    new Todo { Id = 3, Work = "Fall a sleep", IsComplated = false },
    //    new Todo { Id = 4, Work = "Get Up", IsComplated = false },
    //    new Todo { Id = 5, Work = "Brush teeth", IsComplated = false },
    //    new Todo { Id = 6, Work = "Take a shower", IsComplated = true },
    //    new Todo { Id = 7, Work = "Check e-mail", IsComplated = true },
    //    new Todo { Id = 8, Work = "Walk dog", IsComplated = true },
    //    new Todo { Id = 9, Work = "Work 1", IsComplated = true },
    //};

    TestContext context = new();

    [HttpGet]
    public IActionResult GetAll()
    {
        var result = context.TodosTables.ToList();
        return Ok(result);
    }

    [HttpPost]
    public IActionResult Add(TodosTable todosTable)
    {
        context.TodosTables.Add(todosTable);
        context.SaveChanges();
        var result = context.TodosTables.ToList();
        return Ok(result);
    }

    [HttpPost]
    public IActionResult Update(TodosTable todosTable)
    {
        context.TodosTables.Update(todosTable);
        context.SaveChanges();
        var result = context.TodosTables.ToList();
        return Ok(result);
    }

    [HttpPost]
    public IActionResult Delete(TodosTable todosTable)
    {
        context.TodosTables.Remove(todosTable);
        context.SaveChanges();
        var result = context.TodosTables.ToList();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult ChangeComplated(int id) 
    {
        context.TodosTables.ToList().Where(p => p.Id == id).FirstOrDefault().IsComplated = !context.TodosTables.ToList().Where(p => p.Id == id).FirstOrDefault().IsComplated;
        context.SaveChanges();
        var result = context.TodosTables.ToList();
        return Ok(result);
    }
}

//public class Todo
//{
//    public int Id { get; set; }
//    public string Work { get; set; }
//    public bool IsComplated { get; set; }
//}
