enum FieldFormItemType {
  Email = "email",
  Text = "text",
  Radio = "radio",
  Checkbox = "checkbox",
}

enum CardTypes {
  List = "list",
  Gird = "gird",
  Default = "default",
}

enum ActiveForgotPasswordStep {
  step1 = "1",
  step2 = "2",
  step3 = "3",
}

enum StatusTransaction {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

enum TransactionType {
  PROMOTE = "promote",
  MEMBERSHIP = "membership",
}

enum CardMenu {
  EDIT = "edit",
  DELETE = "delete",
  PROMOTE = "promote",
  SOLD = "sold",
}

enum FreeType {
  MONTH = "MONTHLY",
  YEAR = "ANNUAL",
}

enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  AUTHORIZE_NET = "AUTHORIZE_NET",
  CARD_BANKING = "CARD_BANKING",
  IYZIPAY = "IYZIPAY",
  PAYPAL = "PAYPAL",
  DIRECT_TRANSFER = "DIRECT_TRANSFER",
}

enum UserRole {
  Admin = "admin",
  ExamDepartment = "exam_department",
  Proctor = "proctor",
  ITSupport = "it_support",
}

enum Color {
  White = "#FFFFFF",
  Red = "#FF0000",
  Blue = "#0000FF",
  Green = "#00FF00",
  Orange = "#FFA500",
  Black = "#000000",
  Yellow = "#FFFF00",
}

const enums = {
  FieldFormItemType,
  CardTypes,
  StatusTransaction,
  TransactionType,
  CardMenu,
  FreeType,
  PaymentMethod,
  ActiveForgotPasswordStep,
  UserRole,
  Color,
};

export default enums;
