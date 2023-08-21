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
  ProductPage = 'category/:category/:id',
  ProfilePage = '/profile',
  RegistrationPage = '/registration',
  AuthPage = '/login',
  NotFoundPage = '*',
}
