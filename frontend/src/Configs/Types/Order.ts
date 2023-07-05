export interface Root {
  id: number
  createdAt: string
  address: Address
  items: Item[]
  totalAmount: number
}

interface Address {
  id: number
  fullName: string
  address1: string
  address2: string
  city: string
  country: string
  zip: string
}

interface Item {
  id: number
  name: string
  mainpic: string 
  quantity: number
  size: string
  price: number
}
