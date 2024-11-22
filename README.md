##DISCLAMER## Respecto a la lectura del json.

Intenté cambiando la ruta que le paso al fetch de todas formas, cambiando el lugar del archivo, borrando cache, ect y no hubo forma de que GitHub me leyera el json. La consola me devuelve el error 404 y si reviso la ruta que hace para buscar el json, veo que esta buscandolo fuera del proyecto https://lucianatoga.github.io/productos.json. Si yo ingreso manualmente en barra buscadora la siguiente ruta https://lucianatoga.github.io/campocrudo/productos.json, el json se abre correctamente. Busqué por todos lados una solución y dí con varias publicaciones en foros comentando el mismo problema, así que concluí que es un tema de GitHub pages, además de que cuando lo deployé a Netlify, no hubo problemas. 

##GUÍA PARA NAVEGAR LA PÁGINA##

En el Inicio se encuentran las crads con las categorías de productos disponibles. Para ver los productos de cada una, se puede seleccionar el boton "ver" en la cards o el link correspondiente en el menú de navegación.

Para agregar productos al carrito se selecciona el botón "+" presente en la card de cada producto. De esta forma son almacenadas en local storage. 

Para mostrar el carrito, hay que seleccionar el botón con el emoji de carrito en el menú de navegación => se agregará una sección a la derecha de la pantalla con el listado de productos y el monto total junto con dos botones, uno para cerrar el carrito y otro para limpiarlo. Además, al lado de cada producto en el carrito habrá un botón con un menos (-) para eliminarlos si así se desea. 

Al seleccionar el botón limpiar se mostrará un alert consultando si realmente desea limpiar el carrito. Si se selecciona "Limpiar", se vacía el local storage y se deja de mostrar el carrito, si se selecciona "Cancelar" se cierra el alert y el carrito queda intacto.

Si no hay contenido en el carrito, se mostrará un texto indicando que el carrito esta vacío y el botón para cerrarlo.

Estando visible el carrito, si agregas más productos, el resumen se actualiza en el momento, mostrando "en vivo" el estado del carrito.

