"use server";

import { z } from "zod";

const UserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  emailAddress: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function submitUser(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const rawData: UserFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      emailAddress: formData.get("emailAddress") as string,
    };

    const validatedData = UserSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }
    console.log("Address submitted:", validatedData);

    return {
      success: true,
      message: "User saved successfully!",
    };
  } catch (error) {
    console.error("An error occurred:", error);
    return {
      success: false,
      message: "There was an error saving the user",
    };
  }
}