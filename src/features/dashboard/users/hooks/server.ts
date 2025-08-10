import { api } from "@/lib/axios";
import { API_RESPONSE } from "@/types/response";
import { toast } from "sonner";
import { create } from "zustand";

export interface User {
  id: string | number;
  name: string;
  email: string;
  picture: string;
  roles: string;
  username: string;
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  username: string;
  roles: string;
  picture?: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string | number;
}

export interface UserStoreState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;

  getAll: () => Promise<void>;
  getById: (id: string | number) => Promise<User | null>;
  create: (userData: CreateUserRequest) => Promise<boolean>;
  update: (userData: UpdateUserRequest) => Promise<boolean>;
  delete: (id: string | number) => Promise<boolean>;

  setSelectedUser: (user: User | null) => void;
  clearError: () => void;
  setUsers: (users: User[]) => void;
}

export const userStore = create<UserStoreState>((set, get) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  getAll: async () => {
    set({ loading: true, error: null });

    try {
      const response = await api.get<API_RESPONSE<User[]>>("/user/all");

      if (response.data.statusCode === 200) {
        set({
          users: response.data.data,
          loading: false,
          error: null,
        });
      } else {
        throw new Error(
          `Request failed with status: ${response.data.statusCode}`
        );
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });
      toast.error(errorMessage);
      console.error("Failed to fetch users:", error);
    }
  },

  getById: async (id: string | number) => {
    set({ loading: true, error: null });

    try {
      const response = await api.get<API_RESPONSE<User>>(`/user/${id}`);

      if (response.data.statusCode === 200) {
        set({
          selectedUser: response.data.data,
          loading: false,
          error: null,
        });
        return response.data.data;
      } else {
        throw new Error(
          `Request failed with status: ${response.data.statusCode}`
        );
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({
        loading: false,
        error: errorMessage,
        selectedUser: null,
      });
      toast.error(errorMessage);
      console.error("Failed to fetch user:", error);
      return null;
    }
  },

  create: async (userData: CreateUserRequest) => {
    set({ loading: true, error: null });

    try {
      const response = await api.post<API_RESPONSE<User>>("/user", userData);

      if (response.data.statusCode === 201) {
        const { users } = get();
        set({
          users: [...users, response.data.data],
          loading: false,
          error: null,
        });

        toast.success("User created successfully!");
        return true;
      } else {
        throw new Error(
          `Request failed with status: ${response.data.statusCode}`
        );
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });
      toast.error(`Failed to create user: ${errorMessage}`);
      console.error("Failed to create user:", error);
      return false;
    }
  },

  update: async (userData: UpdateUserRequest) => {
    set({ loading: true, error: null });

    try {
      const response = await api.put<API_RESPONSE<User>>(
        `/user/${userData.id}`,
        userData
      );

      if (response.data.statusCode === 200) {
        // Update user in the list
        const { users } = get();
        const updatedUsers = users.map((user) =>
          user.id === userData.id ? response.data.data : user
        );

        set({
          users: updatedUsers,
          selectedUser: response.data.data,
          loading: false,
          error: null,
        });

        toast.success("User updated successfully!");
        return true;
      } else {
        throw new Error(
          `Request failed with status: ${response.data.statusCode}`
        );
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });
      toast.error(`Failed to update user: ${errorMessage}`);
      console.error("Failed to update user:", error);
      return false;
    }
  },

  delete: async (id: string | number) => {
    set({ loading: true, error: null });

    try {
      const response = await api.delete<API_RESPONSE<null>>(`/user/${id}`);

      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 204
      ) {
        // Remove user from the list
        const { users } = get();
        const filteredUsers = users.filter((user) => user.id !== id);

        set({
          users: filteredUsers,
          selectedUser: null,
          loading: false,
          error: null,
        });

        toast.success("User deleted successfully!");
        return true;
      } else {
        throw new Error(
          `Request failed with status: ${response.data.statusCode}`
        );
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });
      toast.error(`Failed to delete user: ${errorMessage}`);
      console.error("Failed to delete user:", error);
      return false;
    }
  },

  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user });
  },

  clearError: () => {
    set({ error: null });
  },

  setUsers: (users: User[]) => {
    set({ users });
  },
}));

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  // Handle axios error structure
  if (typeof error === "object" && error !== null) {
    const axiosError = error as any;
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    if (axiosError.response?.statusText) {
      return axiosError.response.statusText;
    }
    if (axiosError.message) {
      return axiosError.message;
    }
  }

  return "An unexpected error occurred";
}

// Helper hooks for easier usage
export const useUserActions = () => {
  const store = userStore();

  return {
    // Data
    users: store.users,
    selectedUser: store.selectedUser,
    loading: store.loading,
    error: store.error,

    // Actions with confirmation dialogs
    handleView: async (user: User) => {
      store.setSelectedUser(user);
      // You can also fetch fresh data if needed
      // await store.getById(user.id);
    },

    handleEdit: (user: User) => {
      store.setSelectedUser(user);
      // Return the user for form initialization
      return user;
    },

    handleDelete: async (user: User) => {
      // Add confirmation dialog here if needed
      const confirmed = window.confirm(
        `Are you sure you want to delete ${user.name}?`
      );
      if (confirmed) {
        return await store.delete(user.id);
      }
      return false;
    },

    handleCreate: async (userData: CreateUserRequest) => {
      return await store.create(userData);
    },

    handleUpdate: async (userData: UpdateUserRequest) => {
      return await store.update(userData);
    },

    // Utility actions
    refresh: store.getAll,
    clearSelection: () => store.setSelectedUser(null),
    clearError: store.clearError,
  };
};
