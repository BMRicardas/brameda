import type { Meta, StoryObj } from "@storybook/react";
import { SuccessCheckmark } from "./success-checkmark";

const meta: Meta<typeof SuccessCheckmark> = {
  title: "Components/Checkmarks/SuccessCheckmark",
  component: SuccessCheckmark,
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
type Story = StoryObj<typeof SuccessCheckmark>;

export const Default: Story = {};
