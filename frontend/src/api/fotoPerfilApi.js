export async function subirFotoPerfil(idUsuario, archivo) {
    const formData = new FormData();
    formData.append('foto', archivo);
    formData.append('idUsuario', idUsuario);
  
    const res = await fetch('http://localhost:4000/api/foto-perfil/subir', {
      method: 'POST',
      body: formData
    });
  
    if (!res.ok) throw new Error('Error al subir la foto');
  }
  