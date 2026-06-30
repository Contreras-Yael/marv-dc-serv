const key = '2f648a02029473f5456a17a6cf18f0fb'; 
const url = `https://www.superheroapi.com/api.php/${key}`;//https://superheroapi.com{key}
//

async function heroes_api(cantidad) {
  const lista_her = [];

  console.log(`Total de elementos: ${cantidad}`);
  console.log(`Se cargan 20 por ahora, rectificar y cambiar esto`);

  for (let id = 1; id <= 20; id++) {
    try {

      const respuesta = await fetch(`${url}/${id}`);
      
      if (!respuesta.ok);

      const personaje = await respuesta.json();

      lista_her.push(personaje);
      
    } catch (error) {
      console.error(`Error descargando el ID ${id}:`, error.message); 
    }
  }

  console.log('Se completo la conexion');
  return lista_her;
}

module.exports = { heroes_api };

