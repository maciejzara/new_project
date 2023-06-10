import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Table } from "./Table";
import Api from "services/Api";

jest.mock("../services/Api");

describe("Table", () => {
  it("if mocked Level Table is fetched", async () => {
    const mockedLevels = {
      data: [
        { id: 1, attributes: { name: "Europa", description: "opis Europa" } },
        { id: 2, attributes: { name: "Ameryka", description: "opis Ameryka" } },
      ],
    };

    Api.instance = jest.fn().mockReturnValue({
      AxiosGetLevels: jest.fn().mockResolvedValue(mockedLevels),
    });

    render(
      <MemoryRouter>
        <Table
          levels={mockedLevels}
          setLevels={() => {}}
          locations={[]}
          setLocations={() => {}}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Europa")).toBeInTheDocument();
    });
  });
});
