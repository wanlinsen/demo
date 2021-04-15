// 按需导入
import {
    Form, FormItem, Message, Input, Button, Container, Header, Aside, Menu, Submenu, MenuItemGroup,MessageBox,
    MenuItem, Main, Breadcrumb, BreadcrumbItem,Tabs,TabPane,Checkbox,Dropdown,DropdownItem,Avatar,DropdownMenu,Popover,Divider,Badge,Tooltip,Card,Row,Col,Select,Option,Table,TableColumn,DatePicker,TimePicker,Dialog,Pagination,Cascader,Upload,Radio,InputNumber,RadioGroup,Progress,Steps,Step
} from 'element-ui'
import Vue from 'vue'
//message需要挂载到vue的全局作用下,用于提示信息，弹框组件
Vue.prototype.$message = Message
//全局配置confirm
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Form).use(FormItem).use(Input).use(Button).use(Container).use(Header).use(Aside).use(Menu).use(MenuItem).use(Submenu).use(MenuItemGroup).use(Main).use(Breadcrumb).use(BreadcrumbItem).use(Tabs).use(TabPane).use(Checkbox).use(Dropdown).use(DropdownItem).use(Avatar).use(DropdownMenu).use(Popover).use(Divider).use(Badge).use(Tooltip).use(Card).use(Row).use(Col).use(Select).use(Option).use(Table).use(TableColumn).use(DatePicker).use(TimePicker).use(Dialog).use(Pagination).use(Cascader).use(Upload).use(Radio).use(InputNumber).use(RadioGroup).use(Progress).use(Steps).use(Step)
Vue.component(MessageBox.name, MessageBox); 
