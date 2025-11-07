import type { Meta, StoryObj } from "@storybook/react";
import { SubmitButton } from "./submit-button";

const meta: Meta<typeof SubmitButton> = {
  title: "Components/SubmitButton",
  component: SubmitButton,
  tags: ["autodocs"],
  argTypes: {
    formState: {
      control: "select",
      options: ["idle", "loading", "success", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

export const Idle: Story = {
  args: {
    formState: "idle",
  },
};

export const Loading: Story = {
  args: {
    formState: "loading",
  },
};

export const Success: Story = {
  args: {
    formState: "success",
  },
};

export const Error: Story = {
  args: {
    formState: "error",
  },
};

export const Disabled: Story = {
  args: {
    formState: "idle",
    disabled: true,
  },
};
