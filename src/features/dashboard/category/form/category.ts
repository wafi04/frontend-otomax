import z from "zod";

export type CategoryData = {
  id: number;
  name: string;
  sub_name: string;
  code?: string;
  brand: string;
  bannerUrl?: string;
  image?: string;
  desc: string;
  requestBy?: string;
  isCheckNickname: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategory = {
  name: string;
  subName: string;
  code?: string;
  bannerUrl?: string;
  image?: string;
  brand: string;
  desc: string;
  requestBy?: string;
  isCheckNickname: string;
  status: string;
};

export const CreateCategorySchemas = z.object({
  name: z
    .string()
    .min(4, {
      message: "name minimal 4 karakter",
    })
    .max(100, {
      message: "name maksimal 100 karakter",
    })
    .trim(),

  sub_name: z
    .string()
    .min(8, {
      message: "sub name minimal 8 karakter",
    })
    .max(200, {
      message: "sub name maksimal 200 karakter",
    })
    .trim(),

  code: z
    .string()
    .min(2, {
      message: "code minimal 2 karakter",
    })
    .max(20, {
      message: "code maksimal 20 karakter",
    })
    .trim()
    .optional()
    .or(z.literal("")),

  brand: z
    .string()
    .min(2, {
      message: "brand minimal 2 karakter",
    })
    .max(50, {
      message: "brand maksimal 50 karakter",
    })
    .trim(),

  banner_url: z
    .string()
    .url({
      message: "format URL banner tidak valid",
    })
    .optional()
    .or(z.literal("")),

  image: z
    .string()
    .url({
      message: "format URL image tidak valid",
    })
    .optional()
    .or(z.literal("")),

  desc: z
    .string()
    .min(10, {
      message: "deskripsi minimal 10 karakter",
    })
    .max(1000, {
      message: "deskripsi maksimal 1000 karakter",
    })
    .trim(),
  isCheckNickname: z.enum(["active", "inactive"]),
  status: z.enum(["active", "inactive", "pending", "draft"]),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchemas>;
