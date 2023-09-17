export enum PasswordSmth {
  empty = 'empty',
  uppercase = 'uppercase',
  lowercase = 'lowercase',
  short = 'short',
  whitespace = 'whitespace',
  digit = 'digit',
}

export enum ParhRoute {
  MainPage = '/',
  Main = '/main',
  CustomizePage = 'customize',
  AboutUsPage = 'about-us',
  CartPage = 'cart',
  CatalogPage = 'catalog',
  CategoryPage = 'catalog/:category',
  CategoryPageQuery = 'catalog/:category/:query',
  CategoryPageQueryProductPage = 'catalog/:category/:query/:id',
  ProductPage = 'catalog/:category/:id',
  ProductPageCart = '/:id',
  ProfilePage = '/profile/:customerId',
  RegistrationPage = '/registration',
  AuthPage = '/login',
  NotFoundPage = '*',
}

export enum SubCategories {
  Mouses = 'Mice',
  MousePads = 'Mouse Pads',
  TShirts = 'T-Shirts',
  Hoodies = 'Hoodies',
  Caps = 'Caps',
  Mugs = 'Mugs',
  Notepads = 'Notepads',
  Stickers = 'Sticker Packs',
}

export enum Colours {
  red = 'red',
  black = 'black',
  white = 'white',
}

export enum SubcategoriesIDs {
  TShirts = '00b71d4b-d8b0-463c-9561-23017777d0eb',
  Hoodies = 'e19653dc-8b6f-4784-8df2-d8bde2262d28',
  Caps = '4640ae37-887a-4b31-85ed-6bf0462c8d2f',
  Mouses = 'cc0be16d-6a6d-4124-bb77-d8c0fb6c032e',
  MousePads = '66b2a844-59f9-4ae2-9ae0-dd973a2f7158',
  Mugs = 'edaeefdd-0715-435a-bad5-1c6a819a549e',
  Notepads = 'dd59b02e-179d-4806-bb03-4d47cb97567d',
  Stickers = 'dae82f6e-c336-475b-be78-9801c782113e',
}

export enum Sizes {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl',
  xxxl = 'xxxl',
  universal = 'universal',
}

export enum Brands {
  RSSchool = 'RSSchool',
  Logitech = 'Logitech',
}
