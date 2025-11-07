import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{ backgroundColor: "var(--color-grey-dark2)", padding: "2rem" }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    as: {
      control: "select",
      options: ["input", "textarea"],
    },
    type: {
      control: "select",
      options: ["text", "email", "tel"],
      if: { arg: "as", eq: "input" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const TextInput: Story = {
  args: {
    as: "input",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
  },
};

export const EmailInput: Story = {
  args: {
    as: "input",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const TelInput: Story = {
  args: {
    as: "input",
    type: "tel",
    label: "Phone",
    placeholder: "Enter your phone number",
  },
};

export const Textarea: Story = {
  args: {
    as: "textarea",
    label: "Message",
    placeholder: "Enter your message",
    rows: 5,
  },
};

export const WithError: Story = {
  args: {
    as: "input",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    errorMessage: "Please enter a valid email address",
  },
};

export const WithoutLabel: Story = {
  args: {
    as: "input",
    type: "text",
    placeholder: "Enter text",
  },
};
