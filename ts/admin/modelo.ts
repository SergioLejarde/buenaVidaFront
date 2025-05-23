const modeloAdmin = (() => {
  async function obtenerUsuarios(token: string): Promise<any[]> {
    const res = await fetch("http://localhost:3000/api/usuarios", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Error al obtener usuarios");
    return await res.json();
  }

  async function obtenerPedidos(token: string): Promise<any[]> {
    const res = await fetch("http://localhost:3000/api/admin/pedidos", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Error al obtener pedidos");
    return await res.json();
  }

  return { obtenerUsuarios, obtenerPedidos };
})();

export { modeloAdmin };