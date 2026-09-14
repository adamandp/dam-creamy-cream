"use client";

import { ReactNode, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios-instance";

interface DummyLoginProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
  };
}

export function DummyLoginProvider({ children }: DummyLoginProviderProps) {
  const loginMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post<LoginResponse>(
        "/auth/dummy-customer-login",
      );

      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data.accessToken);
    },
    onError: (error) => {
      console.error("Dummy login failed", error);
    },
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      return;
    }

    loginMutation.mutate();
  }, []);

  return <>{children}</>;
}
