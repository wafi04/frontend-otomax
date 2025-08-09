import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryData,
  CreateCategoryInput,
  CreateCategorySchemas,
} from "./category";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PhotoUploader } from "@/components/custom/uploadPhoto";
import { useCategoryStore } from "../hooks/api";
import { useEffect } from "react";
import { status } from "../../../../data/data-status";

export const FromCategory = ({
  initialData,
}: {
  initialData?: CategoryData;
}) => {
  const { createCategory, updateCategory } = useCategoryStore();
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(CreateCategorySchemas),
    mode: "onChange",
  });
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        sub_name: initialData.sub_name,
        code: initialData.code,
        brand: initialData.brand,
        status: initialData.status as status,
        isCheckNickname: initialData.isCheckNickname as "active" | "inactive",
        desc: initialData.desc,
        image: initialData.image,
        banner_url: initialData.bannerUrl,
      });
    }
  }, [initialData, form]);

  const onSubmit = (data: CreateCategoryInput) => {
    if (initialData) {
      updateCategory(initialData.id, data);
    } else {
      createCategory(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Field 1 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama kategori" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field 2 */}
          <FormField
            control={form.control}
            name="sub_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan sub nama kategori" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field 3 */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan kode kategori (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field 4 */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand *</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field 5 */}

          {/* Field 7 - Select Nickname */}
          <FormField
            control={form.control}
            name="isCheckNickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check Nickname *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih opsi check nickname" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field 8 - Select Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <PhotoUploader
                  className="w-full"
                  onUploadComplete={(result) => field.onChange(result.url)}
                  preview={true}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan deskripsi kategori"
                    className="min-h-[100px] h-[180px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Banner di bawah sendiri */}
        <FormField
          control={form.control}
          name="banner_url"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Banner URL</FormLabel>
              <PhotoUploader
                onUploadComplete={(result) => field.onChange(result.url)}
                preview={true}
                className="w-full"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="min-w-[120px] w-full"
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Category"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="w-full"
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
