import { reactive } from 'vue'
export const products = reactive([
  {
    id: 1,
    name: 'Fine Silk',
    volume: '100ml',
    subtitle: 'Luxuoso e Aveludado',
    price: 189.9,
    oldPrice: 199.9,
    category: 'Perfumes Femininos',
    gender: 'Feminino',
    family: 'Oriental Floral',
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    description:
      'Uma fragrância oriental floral intensa, com notas sofisticadas e presença marcante.',
  },
  {
    id: 2,
    name: 'Celtic Legacy',
    volume: '100ml',
    subtitle: 'Ambarado e Cativante',
    price: 189.9,
    oldPrice: 199.9,
    category: 'Perfumes Masculinos',
    gender: 'Masculino',
    family: 'Ambarado',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
    description:
      'Perfume envolvente com acorde licoroso, frutas intensas e fundo ambarado.',
  },
  {
    id: 3,
    name: 'Salt Crystal',
    volume: '100ml',
    subtitle: 'Frescor Oceânico',
    price: 179.9,
    oldPrice: 209.9,
    category: 'Perfumes Masculinos',
    gender: 'Masculino',
    family: 'Aquático',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    description:
      'Fragrância fresca, moderna e levemente amadeirada para o uso diário.',
  },
  {
    id: 4,
    name: 'Litchi Fiorito',
    volume: '100ml',
    subtitle: 'Frutado e Encantador',
    price: 169.9,
    oldPrice: 199.9,
    category: 'Perfumes Femininos',
    gender: 'Feminino',
    family: 'Frutado Floral',
    image:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80',
    description:
      'Uma fragrância alegre, frutada e delicada, ideal para momentos leves.',
  },
  {
    id: 5,
    name: 'Amber Night',
    volume: '100ml',
    subtitle: 'Intenso e Sofisticado',
    price: 219.9,
    oldPrice: 249.9,
    category: 'Perfumes Unissex',
    gender: 'Unissex',
    family: 'Ambarado',
    image:
      'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=900&q=80',
    description:
      'Fragrância intensa com toque ambarado, ideal para noites especiais.',
  },
  {
    id: 6,
    name: 'Citrus Garden',
    volume: '100ml',
    subtitle: 'Cítrico e Refrescante',
    price: 159.9,
    oldPrice: 189.9,
    category: 'Perfumes Unissex',
    gender: 'Unissex',
    family: 'Cítrico',
    image:
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=80',
    description:
      'Perfume leve e fresco, com saída cítrica e sensação limpa para o dia a dia.',
  },
])
// Atualiza a lista compartilhada sem mudar a referência utilizada pelos componentes Vue.
import { apiFetch } from '../services/api'
export async function refreshProducts() {
  const remote = await apiFetch('/products')
  products.splice(0, products.length, ...remote)
  return products
}
