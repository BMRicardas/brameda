import type { Meta, StoryObj } from "@storybook/react";
import { InputErrorMessage } from "./input-error-message";

const meta: Meta<typeof InputErrorMessage> = {
  title: "Components/InputErrorMessage",
  component: InputErrorMessage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputErrorMessage>;

export const Default: Story = {
  args: {
    children: "This field is required",
  },
};

export const LongMessage: Story = {
  args: {
    children: "Please enter a valid email address with at least 5 characters",
  },
};

