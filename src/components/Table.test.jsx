import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Table } from "./Table";
import { Api } from "../services/Api";

const axios = require("axios");

jest.mock("axios");

describe("Table", () => {
  it("if mocked Level Table is fetched", async () => {
    let mockedLevels = {
      data: [
        { id: 1, attributes: { name: "Europa", description: "opis Europa" } },
        { id: 2, attributes: { name: "Ameryka", description: "opis Ameryka" } },
      ],
    };

    axios.get.mockResolvedValue(mockedLevels);

    render(
      <MemoryRouter>
        <Table
          levels={mockedLevels.data}
          setLevels={(levels) => {
            mockedLevels = levels;
          }}
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
