import type { Meta, StoryObj } from "@storybook/react";
import { ErrorCheckmark } from "./error-checkmark";

const meta: Meta<typeof ErrorCheckmark> = {
  title: "Components/Checkmarks/ErrorCheckmark",
  component: ErrorCheckmark,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <span className="wrapper" style={{ position: "relative", left: "0" }}>
        <Story />
      </span>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ErrorCheckmark>;

export const Default: Story = {};
