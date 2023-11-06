describe('Example component', () => {
  test('Debe ser mayor a 10', () => {
    //arreglar
    let value = 10;

    //estimulo
    value = value + 6;

    //observar el resultado
    expect(value).toBeGreaterThan(10);
  })
})
