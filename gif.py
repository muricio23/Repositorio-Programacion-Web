from PIL import ImageDraw
import numpy as np
from PIL import Image
import IPython.display as display

# Cargar la imagen original desde la ruta especificada
image_path = r"C:\Users\mauri\Downloads\Cursos Peralta\res fotos\robot saludo.jpg"
original_image = Image.open(image_path).convert("RGB")  # Asegurar formato RGB

# Mostrar la imagen original en la salida
display.display(original_image)

# Convertir la imagen a un array de NumPy para manipulación de píxeles
original_array = np.array(original_image)

# Crear una lista para almacenar los fotogramas de la animación
frames = []

# Generar 3 fotogramas con la mano en diferentes posiciones simulando un movimiento
for i in range(3):
    shifted_array = original_array.copy()  # Crear una copia de la imagen original
    
    # Definir la región de la imagen donde está la mano (suposición de coordenadas)
    y_start, y_end = 250, 450  # Límites verticales de la mano
    x_start, x_end = 200, 350  # Límites horizontales de la mano
    shift = i * 5  # Valor de desplazamiento para simular movimiento

    # Verificar que los índices no sean negativos para evitar errores
    if y_start - shift >= 0:
        shifted_array[y_start - shift:y_end - shift, x_start:x_end] = original_array[y_start:y_end, x_start:x_end]
    
    # Convertir la matriz nuevamente en una imagen y agregarla a la lista de fotogramas
    frames.append(Image.fromarray(shifted_array))

# Guardar la primera animación en un GIF distinto
gif_path1 = r"C:\Users\mauri\Downloads\Cursos Peralta\res fotos\robot_saludo1.gif"
frames[0].save(gif_path1, save_all=True, append_images=frames[1:], duration=150, loop=0)

# Mostrar la primera animación creada
display.display(display.Image(gif_path1))

# Crear otra serie de imágenes para simular un movimiento más fluido de la mano
frames = []
num_frames = 6  # Número de fotogramas para la animación

for i in range(num_frames):
    frame = original_image.copy()  # Copiar la imagen original
    draw = ImageDraw.Draw(frame)  # Crear un objeto para dibujar sobre la imagen
    
    # Calcular un desplazamiento oscilante de la mano con una función seno
    y_offset = int(5 * np.sin(i * (2 * np.pi / num_frames)))  
    
    # Dibujar una línea azul simulando el leve movimiento de la mano
    draw.line([(270, 300 + y_offset), (320, 250 + y_offset)], fill="blue", width=3)
    
    # Agregar el fotograma a la lista
    frames.append(frame)

# Guardar la segunda animación en otro GIF distinto
gif_path2 = r"C:\Users\mauri\Downloads\Cursos Peralta\res fotos\robot_saludo2.gif"
frames[0].save(gif_path2, save_all=True, append_images=frames[1:], duration=150, loop=0)

# Mostrar la segunda animación creada
display.display(display.Image(gif_path2))
