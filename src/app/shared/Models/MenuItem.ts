export interface MenuItem {
  label: string;
  route?: string;
  children?: MenuItem[];
  collapsed?: boolean;
}